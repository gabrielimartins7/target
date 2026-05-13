import { View, StatusBar } from "react-native";
import { router } from "expo-router";

import { HomeHeader } from "@/components/HomeHeader";
import { Target } from "@/components/Target";
import { List } from "@/components/List";
import { Button } from "@/components/Button";

const summary = {
    total: "R$ 1.234,56",
    input: { label: "Entradas", value: "R$ 6.184,90"},
    output: { label: "Saídas", value: "-R$ 849,65"}
}

const targets = [
    {
        id: "1",
        name: "Meta de economia",
        percentage: "50%",
        current: "R$ 618,45",
        target: "R$ 1.236,90",
    }
]

export default function Index(){
    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <HomeHeader data={summary} />
            <List
                data={targets}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => 
                    <Target data={item} onPress={() => router.navigate(`/in-progress/${item.id}`)} />
                }
                title="Metas"
                emptyMessage="Nenhuma meta cadastrada. Click em nova meta para criar a sua primeira!"
                containerStyle={{ paddingHorizontal: 24 }}
            />

            <View style={{ padding: 24, paddingBottom: 32 }}>
                <Button title="Nova meta" onPress={() => router.navigate("/target")} />
            </View>
        </View>
    )
}