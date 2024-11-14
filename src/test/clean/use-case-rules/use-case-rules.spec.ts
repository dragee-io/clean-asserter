import { describe } from 'bun:test';
import { rulePassed, ruleFailed } from '../../test_utils';

describe('Use Case Rules', () => {
    const FOLDER = './clean/use-case-rules/';
    const USE_CASE_ALLOWED_DEPENDENCIES_RULE = 'use-case-allowed-dependencies';

    describe('A use case must not have any dependency of type Controller/Presenter', () => {
        rulePassed(
            `${FOLDER}${USE_CASE_ALLOWED_DEPENDENCIES_RULE}-rule/rule-passed.json`,
            USE_CASE_ALLOWED_DEPENDENCIES_RULE
        );
        ruleFailed(
            `${FOLDER}${USE_CASE_ALLOWED_DEPENDENCIES_RULE}-rule/rule-failed.json`,
            USE_CASE_ALLOWED_DEPENDENCIES_RULE
        );
    });
});
