import { View } from 'react-native';

import { styles } from './styles';
import { colors } from '@/theme';

import { Option } from './option';

import { TransactionsTypes } from '@/utils/TransactionsType';

type Props = {
    selected: TransactionsTypes
    onChange: (type: TransactionsTypes) => void;
}

export function TransactionType({ selected, onChange }: Props) {
    return (
        <View style={styles.container}>
            <Option
                icon="arrow-upward"
                title="Guardar"
                isSelected={selected === TransactionsTypes.Input}
                selectedColor={colors.blue[500]}
                onPress={() => onChange(TransactionsTypes.Input)}
            />
            <Option
                icon="arrow-downward"
                title="Resgatar"
                isSelected={selected === TransactionsTypes.Output}
                selectedColor={colors.red[400]}
                onPress={() => onChange(TransactionsTypes.Output)}
            />
        </View>
    )
}