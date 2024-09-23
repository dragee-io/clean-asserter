/**
 * **use-case-allowed-dependencies :**
 * Use case must not have any dependency of types "clean/presenter" and "clean/controller"
 * 
 * ## Examples
 * 
 * Example of incorrect dragees for this rule: 
 * 
 * ```json
 * {
 *     "name": "APresenter",
 *     "profile": "clean/presenter"
 * },
 * {
 *     "name": "AUseCase",
 *     "profile": "clean/use_case",
 *     "depends_on": {
 *         "APresenter": [
 *             "field"
 *         ]
 *     }
 * }
 * ```
 * ```json
 * {
 *     "name": "AController",
 *     "profile": "clean/controller"
 * },
 * {
 *     "name": "AUseCase",
 *     "profile": "clean/use_case",
 *     "depends_on": {
 *         "AController": [
 *             "field"
 *         ]
 *     }
 * }
 * ```
 * Example of correct dragees for this rule: 
 * 
 * ```json
 * {
 *     "name": "AUseCase1",
 *     "profile": "clean/use_case"
 * }
 * ```
 * 
 * @module Use Case Allowed Dependencies
 * 
 */
import { type Dragee, type RuleResult, expectDragee, directDependencies, type DrageeDependency, RuleSeverity } from "@dragee-io/asserter-type";
import { profiles, profileOf, useCaseProfile, controllerProfile, presenterProfile } from "../clean.model.ts";

const assertDrageeDependency = ({root, dependencies}: DrageeDependency): RuleResult[] => 
    dependencies.map(dependency => 
        expectDragee(root, dependency, `This use case must not have any dependency of type "${dependency.profile}"`, 
            (dragee) => !profileOf(dragee, controllerProfile, presenterProfile)
        )
    );

export default {
    label: 'Use Case Allowed Dependencies',
    severity: RuleSeverity.ERROR,
    handler: (dragees: Dragee[]): RuleResult[] =>
        profiles[useCaseProfile].findIn(dragees)
            .map(useCase => directDependencies(useCase, dragees))
            .filter(dep => dep.dependencies)
            .map(dep => assertDrageeDependency(dep))
            .flatMap(result => result)};
