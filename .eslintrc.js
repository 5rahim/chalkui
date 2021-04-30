module.exports = {
    plugins: [
        '@typescript-eslint',
        'eslint-comments',
        'promise',
        'unicorn',
    ],
    extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:eslint-comments/recommended',
        'plugin:promise/recommended',
        'plugin:unicorn/recommended',
    ],
    env: {
        node: true,
        browser: true,
    },
    parser: '@typescript-eslint/parser',
    rules: {
        'spaced-comment': 'off',
        'unicorn/no-nested-ternary': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'prefer-destructuring': 'warn',
        '@typescript-eslint/ban-types': 'off',
        'unicorn/explicit-length-check': 'off',
        'react/require-default-props': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-ts-comment': 'warn',
        'dot-notation': 'off',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/no-implied-eval': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        'unicorn/no-reduce': 'off',
        'unicorn/consistent-function-scoping': 'off',
        'import/no-named-as-default': 'off',
        'no-underscore-dangle': 'off',
        'prefer-const': 'off',
        'import/no-cycle': 'off',
        'consistent-return': 'off',
        'unicorn/no-null': 'off',
        'no-param-reassign': ['error', { props: false }],
        // Allows the use of default exports
        'import/no-default-export': 'off',
        // Allows the use of capitalized file names
        'unicorn/filename-case': 'off',
        'object-curly-newline': 'off',
        'no-multi-spaces': 'off',
        'max-len': 'off',
        // If you are not using JSX or have lots of props to be passed or the props spreading is used inside HOC.
        'react/jsx-props-no-spreading': 'off',
        // consistent enforces either both curly braces have a line break directly inside them, or no line breaks are present.
        'react/jsx-curly-newline': 'off',
        'react/jsx-indent-props': 'off',
        'react/jsx-indent': 'off',
        'no-trailing-spaces': 'off',
        // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
        'no-prototype-builtins': 'off',
        // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
        'import/prefer-default-export': 'off',
        // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
        'react/destructuring-assignment': 'error',
        // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
        'react/jsx-filename-extension': 'off',
        // Use function hoisting to improve code readability
        'no-use-before-define': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/semi': 'off',
        'no-loop-func': 'off',
        '@typescript-eslint/no-loop-func': 'off',
        'no-redeclare': 'off',
        '@typescript-eslint/no-redeclare': 'off',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'off',
        // Common abbreviations are known and readable
        'unicorn/prevent-abbreviations': 'off',
        'comma-dangle': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/member-delimiter-style': ['error', {
            multiline: {
                delimiter: 'none',
                requireLast: true
            },
            singleline: {
                delimiter: 'semi',
                requireLast: false
            }
        }],
        '@typescript-eslint/naming-convention': 'off',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before'
                    }
                ],
                pathGroupsExcludedImportTypes: ['react'],
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                }
            }
        ],
    },

};
