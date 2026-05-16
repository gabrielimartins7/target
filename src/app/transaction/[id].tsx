import { useState } from "react";
import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { TransactionsTypes } from "@/utils/TransactionsType";

import { Button } from "@/components/Button";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Input } from "@/components/Input";
import { PageHeader } from "@/components/PageHeader";
import { TransactionType } from "@/components/TransactionType";

export default function Transaction() {
    const [type, setType] = useState(TransactionsTypes.Input)
    const params = useLocalSearchParams<{id: string}>()
    
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
                    value={0}
                />
                <Input
                    label="Motivo (opcional)"
                    placeholder="Ex: Investir em CDB de 110% no banco xpto"
                />
                <Button title="Salvar" />
            </View>
        </View>
    )
}