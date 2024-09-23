import { findRules } from '@dragee-io/asserter-type';

export default {
    namespace: 'clean',
    rules: findRules('clean', `${import.meta.dir}/src/rules/`)
};