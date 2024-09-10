import { type Dragee, type RuleResult, expectDragees, directDependencies, type DrageeDependency, RuleSeverity } from "@dragee-io/asserter-type";
import { CleanRule } from '../clean-rule.model.ts';
import { profiles, controllerProfile, useCaseProfile } from "../clean.model.ts";

const assertDrageeDependency = ({root, dependencies}: DrageeDependency): RuleResult =>
    expectDragees(root, dependencies, `The controller "${root.name}" must at least contain a "clean/use_case" type dragee`, 
        (dependencies) => !!profiles[useCaseProfile].findIn(dependencies).length
    )

export default new CleanRule(
    'Controller Mandatory Dependencies',
    RuleSeverity.ERROR,
    (dragees: Dragee[]): RuleResult[] =>
        profiles[controllerProfile].findIn(dragees)
            .map(useCase => directDependencies(useCase, dragees))
            .filter(dep => dep.dependencies)
            .map(dep => assertDrageeDependency(dep))
            .flatMap(result => result));