import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: ['out/**', '.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  {
    rules: {
      // LazyMotion only pays off if every component imports `m`, never `motion`.
      // A single <motion.div> pulls the full bundle back in and silently erases the saving.
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'motion/react',
              importNames: ['motion'],
              message:
                'Import `m` instead of `motion`. `motion` defeats LazyMotion and pulls in the full bundle.',
            },
          ],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];

export default eslintConfig;
