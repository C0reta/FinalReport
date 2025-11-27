import React from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../app/style';

interface EditShelfModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: () => void;
    value: string;
    onChangeText: (text: string) => void;
}

export const EditShelfModal = ({ visible, onClose, onSave, value, onChangeText }: EditShelfModalProps) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>책장 이름 변경</Text>

                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeText}
                        value={value}
                        placeholder="이름을 입력하세요"
                    />

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.modalBtn, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.ButtonText}>취소</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalBtn, styles.saveButton]}
                            onPress={onSave}
                        >
                            <Text style={[styles.ButtonText, { color: 'white' }]}>저장</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};