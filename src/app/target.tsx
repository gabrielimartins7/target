import React, { useState } from "react";
import { Alert, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Button } from "@/components/Button";

export default function Target() {
    const [isProcessing, setIsProcessing] = useState(false)
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(0)

    const params = useLocalSearchParams<{ id?: string }>()

    function handleSaveTarget() {
        if (!name.trim() || amount <= 0) {
            return Alert.alert("Atenção", "Preencha nome e valor.")
        }

        setIsProcessing(true)

        if (params.id) {
            // Update existing target
        } else {
            createTarget()
        }
    }

    async function createTarget() {
        try {
            Alert.alert("Sucesso", "Meta criada com sucesso!", [
                {
                    text: "Ok",
                    onPress: () => router.back()
                },
            ])
        } catch (error) {
            Alert.alert("Erro", "Ocorreu um erro ao criar a meta.")
            console.log(error)
            setIsProcessing(false)
        }
    }

    return (
        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader title="Meta" subtitle="Economize para alcançar sua meta financeira." />
            
            <View style={{ marginTop: 32, gap: 24 }}>
                <Input
                    label="Nome da meta"
                    placeholder="Ex: Viajar para Europa"
                    onChangeText={setName}
                    value={name}
                />
                <CurrencyInput
                    label="Valor alvo"
                    value={amount}
                    onChangeValue={(value) => setAmount(value ?? 0)}
                />
                <Button
                    title="Salvar"
                    onPress={handleSaveTarget}
                    isProcessing={isProcessing}
                />
            </View>
        </View>
    )
}