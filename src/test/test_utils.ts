import { createRuleFailedOnAsserter, createRulePassedOnAsserter } from '@dragee-io/type/test-utils';
import cleanAsserter from '../..';

export const rulePassed = createRulePassedOnAsserter(cleanAsserter, require);

export const ruleFailed = createRuleFailedOnAsserter(cleanAsserter, require);
