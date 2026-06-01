import { useCallback, useState } from "react";
import { Alert, View } from "react-native";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";

import { Button } from "@/components/Button";
import { List } from "@/components/List";
import { Loading } from "@/components/Loading";
import { PageHeader } from "@/components/PageHeader";
import { Progress } from "@/components/Progress";
import { Transaction,TransactionProps } from "@/components/Transaction";

import { useTargetDatabase } from "@/database/useTargetDatabase";

import { TransactionsTypes } from "@/utils/TransactionsType";
import { numberToCurrency } from "@/utils/numberToCurrency";


const transactions: TransactionProps[] = [
    {
        id: "1",
        value: "R$ 580,00",
        date: "20/06/2024",
        description: "Compra na Apple Store",
        type: TransactionsTypes.Input
    },
    {
        id: "2",
        value: "R$ 380,00",
        date: "20/06/2024",
        description: "Compra na Apple Store",
        type: TransactionsTypes.Output
    },
]

export default function InProgress() {
    const [isFetching, setIsFetching] = useState(true)
    const [details, setDetails] = useState({
        name: "",
        currency: "R$ 0,00",
        target: "R$ 0,00",
        percentage: 0,
    })
    const params = useLocalSearchParams<{id: string}>()

    const targetDatabase = useTargetDatabase()

    async function fetchDetails() {
        try {
            const response = await targetDatabase.show(Number(params.id))

            if (!response) {
                Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.")
                return
            }

            setDetails({
                name: response.name,
                currency: numberToCurrency(response.current),
                target: numberToCurrency(response.amount),
                percentage: response.percentage
            })
        } catch (error) {
            Alert.alert("Erro", "Não foi possível carregar os detalhes da meta.")
            console.log(error)
        }
    }

    async function fetchData() {
        const fetchDetailsPromise = fetchDetails()

        await Promise.all([fetchDetailsPromise])
        setIsFetching(false)
    }

    useFocusEffect(
        useCallback(() => {
            fetchData()
        }, [])
    )

    if(isFetching) {
        return <Loading />
    }

    return (
            <View style={{ flex: 1, padding: 24, gap: 32 }}>
                <PageHeader
                    title={details.name}
                    rightButton={{
                        icon: "edit",
                        onPress: () => router.navigate(`/target?id=${params.id}`),
                    }}
                />

                <Progress data={details} />
                <List
                    title="Transações"
                    data={transactions}
                    renderItem={({ item }) => (
                        <Transaction data={item} onRemove={() => {}} />
                    )}
                    emptyMessage="Nenhuma transação. Click em nova transação para guardar seu primeiro dinheiro aqui."
                />
                <Button
                    title="Nova transação"
                    onPress={() => router.navigate(`/transaction/${params.id}`)}
                />
            </View>
        )
}