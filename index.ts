import { findRules } from '@dragee-io/type/asserter';

export default {
    namespace: 'clean',
    rules: findRules('clean', `${import.meta.dir}/src/rules/`)
};
