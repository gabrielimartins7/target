import { View, Text } from "react-native"

import { styles } from "./styles"

type SaveValue = {
    currency: string
    target: string
    percentage: number
}

type Props = {
    data: SaveValue
}

export function Progress({ data }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Valor guardado</Text>

            <View style={styles.status}>
                <Text style={styles.value}>
                    {data.currency}
                    <Text style={styles.target}> de {data.target}</Text>
                </Text>

                <Text style={styles.percentage}>{data.percentage.toFixed(0)}%</Text>
            </View>

            <View style={styles.progress}>
                <View style={[styles.currencyProgress, { width: `${data.percentage}%` }]} />
            </View>
        </View>
    )
}