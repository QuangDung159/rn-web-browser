module.exports = {
    extends: 'airbnb',
    parser: 'babel-eslint',
    env: {
        jest: true,
    },
    settings: {
        'import/resolver': { 'babel-module': {} }
    },
    rules: {
        'no-use-before-define': 'off',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'comma-dangle': 'off',
        // Indent with 4 spaces
        indent: ['error', 4, { SwitchCase: 1 }],

        // Indent JSX with 4 spaces
        'react/jsx-indent': ['error', 4],

        // Indent props with 4 spaces
        'react/jsx-indent-props': ['error', 4],
        'react/jsx-props-no-spreading': 'off',
        'react/forbid-prop-types': 'off',
        'no-console': 'off',
        'max-len': ['error', {
            code: 200
        }],
        'no-unused-expressions': 'off',
        'consistent-return': 'off',
        'react/jsx-no-comment-textnodes': 'off'
    },
    globals: {
        fetch: false
    }
};
