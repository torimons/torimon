module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    moduleNameMapper: {
        "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
    },
    moduleFileExtensions: [
        "js",
        "ts",
        "json",
        // *.vue ファイルを処理するように Jest に指示する
        "vue"
    ],
    transform: {
    // vue-jest で *.vue ファイルを処理する
    ".*\\.(vue)$": "vue-jest"
    }
}
