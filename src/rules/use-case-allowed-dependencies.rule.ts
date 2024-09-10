import { type Dragee, type RuleResult, expectDragee, directDependencies, type DrageeDependency, RuleSeverity } from "@dragee-io/asserter-type";
import { CleanRule } from '../clean-rule.model.ts';
import { profiles, profileOf, useCaseProfile, controllerProfile, presenterProfile } from "../clean.model.ts";

const assertDrageeDependency = ({root, dependencies}: DrageeDependency): RuleResult[] => 
    dependencies.map(dependency => 
        expectDragee(root, dependency, `The use case "${root.name}" must not have any dependency of type "${dependency.profile}"`, 
            (dragee) => !profileOf(dragee, controllerProfile, presenterProfile)
        )
    );

export default new CleanRule(
    'Use Case Allowed Dependencies',
    RuleSeverity.ERROR,
    (dragees: Dragee[]): RuleResult[] =>
        profiles[useCaseProfile].findIn(dragees)
            .map(useCase => directDependencies(useCase, dragees))
            .filter(dep => dep.dependencies)
            .map(dep => assertDrageeDependency(dep))
            .flatMap(result => result));
