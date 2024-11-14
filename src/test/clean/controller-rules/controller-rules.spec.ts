import { describe } from 'bun:test';
import { rulePassed, ruleFailed } from '../../test_utils';

describe('Controller Rules', () => {
    const FOLDER = './clean/controller-rules/';
    const CONTROLLER_MANDATORY_DEPENDENCIES_RULE = 'controller-mandatory-dependencies';

    describe('A controller must at least contain one use case', () => {
        rulePassed(
            `${FOLDER}${CONTROLLER_MANDATORY_DEPENDENCIES_RULE}-rule/rule-passed.json`,
            CONTROLLER_MANDATORY_DEPENDENCIES_RULE
        );
        ruleFailed(
            `${FOLDER}${CONTROLLER_MANDATORY_DEPENDENCIES_RULE}-rule/rule-failed.json`,
            CONTROLLER_MANDATORY_DEPENDENCIES_RULE
        );
    });
});
