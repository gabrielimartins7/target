import { View } from "react-native";

import { PageHeader } from "@/components/PageHeader";
import { Input } from "@/components/Input";
import { CurrencyInput } from "@/components/CurrencyInput";
import { Button } from "@/components/Button";

export default function Target() {
    return (
        <View style={{ flex: 1, padding: 24 }}>
            <PageHeader title="Meta" subtitle="Economize para alcançar sua meta financeira." />
            
            <View style={{ marginTop: 32, gap: 24 }}>
                <Input
                    label="Nome da meta"
                    placeholder="Ex: Viajar para Europa"
                />
                <CurrencyInput
                    label="Valor alvo"
                    value={24350.73}
                />
                <Button title="Salvar"/>
            </View>
        </View>
    )
}