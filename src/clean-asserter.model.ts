import { Asserter, findRules } from '@dragee-io/asserter-type';

export class CleanAsserter extends Asserter {
    constructor() {
        super('clean', findRules(`${import.meta.dir}/rules/`));
    }
}
