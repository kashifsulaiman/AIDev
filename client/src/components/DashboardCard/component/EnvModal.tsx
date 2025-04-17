import { Modal, ModalBody, ModalContent } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { StoreModel } from '@/redux/model';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { areEnvValuesComplete, extractEnvVariables, replaceEnvInFiles } from '@/utils/utils';

export default function EnvModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [envKeys, setEnvKeys] = useState<string[]>([]);
    const [envValues, setEnvValues] = useState<Record<string, string>>({});

    const env = useStoreState<StoreModel>((state) => state?.envModel?.env);
    const setEnv = useStoreActions<StoreModel>((state) => state?.envModel?.setENV);

    const { code } = useStoreState<StoreModel>((state) => state?.promptModel?.prompt);
    const setPrompt = useStoreActions<StoreModel>((actions) => actions?.promptModel?.setPrompt);

    useEffect(() => {
        if (!code) return;
        const envs = extractEnvVariables(Object.values(code.files));
        setEnvKeys(envs);
        if (!envs.length) return;
        if (env && areEnvValuesComplete(envs, env)) {
            updateEnvInCode(env);
            return;
        }
        setIsOpen(true);
    }, [code]);

    const handleChange = (key: string, value: string) => {
        setEnvValues((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEnv(envValues);
        updateEnvInCode(envValues);
        setIsOpen(false);
    };

    const updateEnvInCode = (envValues: Record<string, string>) => {
        const updatedFiles = replaceEnvInFiles(envValues, code.files);
        setPrompt({ code: { ...code, files: updatedFiles } });
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(false)} placement="center">
            <ModalContent>
                <ModalBody className="p-6 text-center max-h-96 overflow-y-auto ">
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">
                        Environment Variables Required
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {envKeys.map((key) => (
                            <div key={key} className="flex flex-col items-start w-full">
                                <label htmlFor={key} className="text-sm font-medium text-gray-700">
                                    {key}
                                </label>
                                <input
                                    id={key}
                                    type="text"
                                    value={envValues[key] || ''}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    className="mt-1 rounded-md border px-3 py-2 text-sm outline-none w-full"
                                    placeholder={`Enter value for ${key}`}
                                />
                            </div>
                        ))}
                        <Button type="submit" className="bg-gray-800 text-white">
                            Save
                        </Button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
