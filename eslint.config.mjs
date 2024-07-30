export default [{
    files: [
        "**/*.ts"
    ],
    ignores: [
        "node_modules"
    ],
    rules: {
        "semi": [
            "warn",
            "always"
        ],
        "jsx-quotes": [
            "warn",
            "prefer-double"
        ],
        "quotes": [
            "warn",
            "double",
            {
                "allowTemplateLiterals": true
            }
        ],
        "eqeqeq": [
            "warn",
            "always"
        ],
        "no-delete-var": "warn",
        "no-else-return": "warn",
        "no-eval": "error",
        "no-extra-label": "warn",
        "no-extra-semi": "warn",
        "no-proto": "warn",
        "no-script-url": "warn",
        "no-var": "warn",
        "no-with": "warn",
        "array-bracket-spacing": [
            "warn",
            "never"
        ],
        "arrow-parens": [
            "warn",
            "as-needed"
        ],
        "no-extra-parens": [
            "warn",
            "all"
        ],
        "no-extra-boolean-cast": "warn",
        "no-extra-bind": "warn",
        "arrow-spacing": [
            "warn",
            {
                "before": true,
                "after": true
            }
        ],
        "block-spacing": "warn",
        "brace-style": "warn",
        "comma-dangle": [
            "warn",
            "never"
        ],
        "comma-spacing": [
            "warn",
            {
                "before": false,
                "after": true
            }
        ],
        "comma-style": [
            "warn",
            "last"
        ],
        "dot-location": [
            "warn",
            "property"
        ],
        "eol-last": [
            "warn",
            "always"
        ],
        "func-call-spacing": [
            "warn",
            "never"
        ],
        "generator-star-spacing": [
            "warn",
            {
                "before": false,
                "after": true
            }
        ],
        "implicit-arrow-linebreak": [
            "warn"
        ],
        "indent": [
            "warn",
            4,
            {
                "SwitchCase": 1
            }
        ],
        "key-spacing": [
            "warn"
            // 全部使用默认
        ],
        "keyword-spacing": "warn",
        "linebreak-style": [
            "warn",
            "unix"
        ],
        "max-statements-per-line": [
            "warn",
            {
                "max": 2
            }
        ],
        "multiline-ternary": [
            "warn",
            "never"
        ],
        "new-parens": "warn",
        "no-multi-spaces": "warn",
        "no-multiple-empty-lines": "warn",
        "no-trailing-spaces": "warn",
        "no-whitespace-before-property": "warn",
        "nonblock-statement-body-position": "warn",
        "object-curly-newline": [
            "warn",
            "always"
        ],
        "object-curly-spacing": [
            "warn",
            "never"
        ],
        "object-property-newline": "warn",
        "operator-linebreak": [
            "warn",
            "before"
        ],
        "padded-blocks": [
            "warn",
            "never"
        ],
        "rest-spread-spacing": [
            "warn",
            "never"
        ],
        "semi-spacing": [
            "warn",
            {
                "before": false,
                "after": true
            }
        ],
        "semi-style": [
            "warn",
            "last"
        ],
        "space-before-blocks": [
            "warn",
            "always"
        ],
        "space-before-function-paren": [
            "warn",
            {
                "anonymous": "always",
                "named": "never",
                "asyncArrow": "always"
            }
        ],
        "space-in-parens": [
            "warn",
            "never"
        ],
        "space-infix-ops": [
            "warn"
        ],
        "space-unary-ops": [
            "warn",
            {
                "words": true,
                "nonwords": false
            }
        ],
        "switch-colon-spacing": [
            "warn"
        ],
        "template-curly-spacing": [
            "warn",
            "never"
        ],
        "template-tag-spacing": [
            "warn",
            "never"
        ],
        "unicode-bom": "warn",
        "wrap-iife": [
            "warn",
            "inside"
        ],
        "yield-star-spacing": [
            "warn",
            "after"
        ],
        "no-magic-numbers": [
            "warn",
            {
                "ignoreArrayIndexes": true,
                "ignore": [
                    -1,
                    0,
                    1
                ]
            }
        ],
        "max-len": [
            "warn",
            {
                "code": 160,
                "tabWidth": 4
            }
        ]
    }
}];
