import { describe, expect, test } from 'bun:test';

import { type Report, asserterHandler } from '@dragee-io/type/asserter';
import cleanAsserter from '../..';

describe('Clean Asserter', () => {
    test('assert with no dragees', () => {
        const report: Report = asserterHandler(cleanAsserter, []);
        expect(report.pass).toBeTrue();
        expect(report.namespace).toBe('clean');
    });
});
