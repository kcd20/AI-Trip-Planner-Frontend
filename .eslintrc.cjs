module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  ignorePatterns: ['node_modules/*'],
  extends: ['eslint:recommended', 'plugin:storybook/recommended'],
  overrides: [
    {
      files: ['**/*.ts{,x}'],
      parser: '@typescript-eslint/parser',
      settings: {
        react: {
          version: 'detect',
        },
        'import/extensions': ['.ts', '*.tsx'],
        'import/resolver': {
          typescript: {},
        },
      },
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      extends: [
        'airbnb',
        'eslint:recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
      ],
      rules: {
        curly: ['error', 'all'],
        'import/no-cycle': [
          'error',
          {
            ignoreExternal: false,
            maxDepth: 3,
          },
        ],
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: ['**/*.test.ts', '**/*.test.tsx'],
          },
        ],
        'no-console': ['error'],
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              '@mui/*/*/*',
              '!@mui/material/test-utils/*',
              '@/features/*/*',
            ],
          },
        ],
        'linebreak-style': ['error', 'unix'],
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            js: 'never',
            jsx: 'never',
            ts: 'never',
            tsx: 'never',
          },
        ],
        'import/order': [
          'error',
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
            ],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
        'import/default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-named-as-default': 'off',
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': [
          'error',
          {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        ],
        'react/require-default-props': 'off',
        'react/function-component-definition': [
          'error',
          {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
          },
        ],
        'react/react-in-jsx-scope': 'off',
        'react/jsx-key': [
          'error',
          {
            checkFragmentShorthand: true,
          },
        ],
        'react/jsx-max-depth': [
          'error',
          {
            max: 8,
          },
        ],
        'react/jsx-no-duplicate-props': [
          'error',
          {
            ignoreCase: false,
          },
        ],
        'react/jsx-props-no-spreading': [
          'error',
          {
            html: 'enforce',
            custom: 'ignore',
          },
        ],
        'react/jsx-sort-props': [
          'error',
          {
            callbacksLast: true,
            reservedFirst: true,
            shorthandFirst: true,
          },
        ],
        'react/prop-types': ['off'],
        'react/state-in-constructor': ['error', 'never'],
        'spaced-comment': [
          'error',
          'always',
          {
            line: {
              markers: ['=', '!', '/'],
              exceptions: ['-', '+', '/ <reference'],
            },
            block: {
              markers: ['!', '=', '!', ':', '::'],
              exceptions: ['-', '+', '*'],
              balanced: true,
            },
          },
        ],
        'jsx-a11y/anchor-is-valid': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            varsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/no-namespace': ['warn'],
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['error'],
        '@typescript-eslint/no-empty-function': ['error'],
        '@typescript-eslint/no-empty-interface': ['off'],
        '@typescript-eslint/no-explicit-any': ['warn'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        ' ': ['off'],
        quotes: [
          'error',
          'single',
          {
            avoidEscape: true,
            allowTemplateLiterals: false,
          },
        ],
        semi: ['error', 'always'],
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
          {
            usePrettierrc: true,
          },
        ],
      },
    },
    {
      files: ['**/*.lazy.tsx'],
      rules: {
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
      },
    },
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-props-no-spreading': 'off',
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
      },
    },
    {
      files: ['index.ts{,x}', 'config.ts{,x}'],
      rules: {
        'import/prefer-default-export': ['off'],
      },
    },
    {
      files: ['*.d.ts', '*.js', '*.test.ts{,x}', 'jest.*.{j,t}s'],
      rules: {
        'class-methods-use-this': ['off'],
        'import/prefer-default-export': ['off'],
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            optionalDependencies: true,
            peerDependencies: true,
          },
        ],
        'no-console': ['off'],
        '@typescript-eslint/explicit-function-return-type': ['off'],
        '@typescript-eslint/no-empty-function': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
        '@typescript-eslint/no-var-requires': ['off'],
      },
    },
    {
      files: ['tools/**/*.ts{,x}'],
      rules: {
        'import/no-extraneous-dependencies': ['off'],
        '@typescript-eslint/no-explicit-any': ['off'],
      },
    },
  ],
};



