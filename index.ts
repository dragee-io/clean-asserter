import { findRule, findRules, type Asserter } from '@dragee-io/type/asserter';

export default {
    namespace: 'clean',
    rules: findRules('clean', `${import.meta.dir}/src/rules/`),
    rule: (ruleName: string) => findRule('clean', `${import.meta.dir}/src/rules/`, ruleName)
} satisfies Asserter;
