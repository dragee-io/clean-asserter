/**
 * **controller-mandatory-dependencies :**
 * Controllers must at least contain a "clean/use_case" type dragee
 *
 * ## Examples
 *
 * Example of incorrect dragees for this rule:
 *
 * ```json
 * {
 *     "name": "AController",
 *     "profile": "clean/controller"
 * }
 * ```
 * Example of correct dragees for this rule:
 *
 * ```json
 * {
 *     "name": "AController",
 *     "profile": "clean/controller",
 *     "depends_on": {
 *         "AUseCase1": [
 *             "field"
 *         ]
 *     }
 * },
 * {
 *     "name": "AUseCase1",
 *     "profile": "clean/use_case"
 * }
 * ```
 *
 * @module Controller Mandatory Dependencies
 *
 */
import {
    type RuleResult,
    RuleSeverity,
    directDependencies,
    expectDragees
} from '@dragee-io/type/asserter';
import type { Dragee, DrageeDependency } from '@dragee-io/type/common';
import { controllerProfile, profiles, useCaseProfile } from '../clean.model.ts';

const assertDrageeDependency = ({ root, dependencies }: DrageeDependency): RuleResult =>
    expectDragees(
        root,
        dependencies,
        `This controller must at least contain a "clean/use_case" type dragee`,
        dependencies => !!profiles[useCaseProfile].findIn(dependencies).length
    );

export default {
    label: 'Controller Mandatory Dependencies',
    severity: RuleSeverity.ERROR,
    handler: (dragees: Dragee[]): RuleResult[] =>
        profiles[controllerProfile]
            .findIn(dragees)
            .map(useCase => directDependencies(useCase, dragees))
            .filter(dep => dep.dependencies)
            .flatMap(dep => assertDrageeDependency(dep))
};
