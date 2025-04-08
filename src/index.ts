import {
    type Plugin,
    type UserConfig
} from 'vite';

import {
    type ManualChunkMeta,
    type OutputOptions
} from 'rollup';

export default (options): Plugin => ({
    name: 'vite:castaway',

    config: (
        config: UserConfig
    ) => {
        const output = config.build?.rollupOptions?.output as OutputOptions | undefined;
        let existing = output?.manualChunks ?? undefined;

        if (typeof existing !== 'function') {
            existing = undefined;
        }

        return {
            build: {
                rollupOptions: {
                    output: {
                        manualChunks: (
                            id: string,
                            meta: ManualChunkMeta
                        ) => {
                            // React
                            if (
                                id.includes('node_modules/react') ||
                                id.endsWith('integrations/react.ts')
                            ) {
                                return 'react';
                            }

                            // Vue
                            if (
                                id.includes('@vue') ||
                                id.includes('node_modules/vue/dist') ||
                                id.endsWith('integrations/vue.ts')
                            ) {
                                return 'vue';
                            }

                            if (existing) {
                                const output = existing(id, meta);

                                if (output !== undefined) {
                                    return output;
                                }
                            }

                            if (
                                id.endsWith('.vue') ||
                                id.endsWith('.jsx')
                            ) {
                                return 'components';
                            }
                        }
                    },
                    preserveEntrySignatures: 'strict'
                }
            }
        }
    }
});
