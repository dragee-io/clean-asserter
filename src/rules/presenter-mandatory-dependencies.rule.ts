/**
 * **presenter-mandatory-dependencies :**
 * Presenters must at least contain a "clean/use_case" type dragee
 * 
 * ## Examples
 * 
 * Example of incorrect dragees for this rule: 
 * 
 * ```json
 * {
 *     "name": "APresenter",
 *     "profile": "clean/presenter"
 * }
 * ```
 * Example of correct dragees for this rule: 
 * 
 * ```json
 * {
 *     "name": "APresenter",
 *     "profile": "clean/presenter",
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
 * @module Presenter Mandatory Dependencies
 * 
 */
import { type Dragee, type RuleResult, expectDragees, directDependencies, type DrageeDependency, RuleSeverity } from "@dragee-io/asserter-type";
import { profiles, presenterProfile, useCaseProfile } from "../clean.model.ts";

const assertDrageeDependency = ({root, dependencies}: DrageeDependency): RuleResult =>
    expectDragees(root, dependencies, `This presenter must at least contain a "clean/use_case" type dragee`, 
        (dependencies) => !!profiles[useCaseProfile].findIn(dependencies).length
    )

export default {
    label: 'Presenter Mandatory Dependencies',
    severity: RuleSeverity.ERROR,
    handler: (dragees: Dragee[]): RuleResult[] =>
        profiles[presenterProfile].findIn(dragees)
            .map(useCase => directDependencies(useCase, dragees))
            .filter(dep => dep.dependencies)
            .map(dep => assertDrageeDependency(dep))
            .flatMap(result => result)};