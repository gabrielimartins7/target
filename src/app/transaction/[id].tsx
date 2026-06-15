import { useState } from "react";
import { Alert, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { TransactionsTypes } from "@/utils/TransactionsType";
import { useTransactionsDatabase } from "@/database/useTransactionsDatabase"

import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { TransactionType } from "@/components/TransactionType";

export default function Transaction() {
    const [amount, setAmount] = useState<number | null>(null)
    const [type, setType] = useState(TransactionsTypes.Input)
    const [isCreating, setIsCreating] = useState(false)
    const [observations, setObservations] = useState("")

    const params = useLocalSearchParams<{id: string}>()
    const transactionsDatabase = useTransactionsDatabase()

    async function handleCreate() {
        try {
            if(!amount || amount <= 0){
                return Alert.alert("Atenção", "Preencha o valor. A transação deve ser maior que zero.")
            }

            setIsCreating(true)
            await transactionsDatabase.create({
                target_id: Number(params.id),
                amount: type === TransactionsTypes.Output ? amount * -1 : amount,
                observation: observations
            })

            Alert.alert("Sucesso", "Transação salva com sucesso.", [
                {
                    text: "OK",
                    onPress: () => router.back()
                }
            ])
        } catch (error) {
            Alert.alert("Erro", "Não foi possível criar a transação.")
            console.error(error)
            setIsCreating(false)
        }
    }
    
    return (
        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader
                title="Nova Transação"
                subtitle="A cada valor guardado você fica mais próximo da sua meta. Se esforce para guardar e eviteretirar."
            />
            <View style={{ marginTop: 32, gap: 24 }}>
                <TransactionType
                    selected={type}
                    onChange={setType}
                />
                <CurrencyInput
                    label="Valor"
                    value={amount}
                    onChangeValue={setAmount}
                />
                <Input
                    label="Motivo (opcional)"
                    placeholder="Ex: Investir em CDB de 110% no banco xpto"
                    onChangeText={setObservations}
                />
                <Button title="Salvar" onPress={handleCreate} isProcessing={isCreating} />
            </View>
        </View>
    )
}