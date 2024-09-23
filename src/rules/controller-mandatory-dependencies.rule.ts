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
import { type Dragee, type RuleResult, expectDragees, directDependencies, type DrageeDependency, RuleSeverity } from "@dragee-io/asserter-type";
import { profiles, controllerProfile, useCaseProfile } from "../clean.model.ts";

const assertDrageeDependency = ({root, dependencies}: DrageeDependency): RuleResult =>
    expectDragees(root, dependencies, `This controller must at least contain a "clean/use_case" type dragee`, 
        (dependencies) => !!profiles[useCaseProfile].findIn(dependencies).length
    )

export default {
    label: 'Controller Mandatory Dependencies',
    severity: RuleSeverity.ERROR,
    handler: (dragees: Dragee[]): RuleResult[] =>
        profiles[controllerProfile].findIn(dragees)
            .map(useCase => directDependencies(useCase, dragees))
            .filter(dep => dep.dependencies)
            .map(dep => assertDrageeDependency(dep))
            .flatMap(result => result)};