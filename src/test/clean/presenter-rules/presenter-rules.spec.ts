import { describe } from 'bun:test';
import { rulePassed, ruleFailed } from '../../test_utils';

describe('Presenter Rules', () => {
    const FOLDER = './clean/presenter-rules/';
    const PRESENTER_MANDATORY_DEPENDENCIES_RULE = 'presenter-mandatory-dependencies';

    describe('A presenter must at least contain one use case', () => {
        rulePassed(
            `${FOLDER}${PRESENTER_MANDATORY_DEPENDENCIES_RULE}-rule/rule-passed.json`,
            PRESENTER_MANDATORY_DEPENDENCIES_RULE
        );
        ruleFailed(
            `${FOLDER}${PRESENTER_MANDATORY_DEPENDENCIES_RULE}-rule/rule-failed.json`,
            PRESENTER_MANDATORY_DEPENDENCIES_RULE
        );
    });
});
