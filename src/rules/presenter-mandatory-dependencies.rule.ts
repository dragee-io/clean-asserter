import { type Dragee, type RuleResult, expectDragees, directDependencies, type DrageeDependency, RuleSeverity } from "@dragee-io/asserter-type";
import { CleanRule } from '../clean-rule.model.ts';
import { kinds, presenterKind, useCaseKind } from "../clean.model.ts";

const assertDrageeDependency = ({root, dependencies}: DrageeDependency): RuleResult =>
    expectDragees(dependencies, `The presenter "${root.name}" must at least contain a "clean/use_case" type dragee`, 
        (dependencies) => !!kinds[useCaseKind].findIn(dependencies).length
    )

export default new CleanRule(
    'Presenter Mandatory Dependencies',
    RuleSeverity.ERROR,
    (dragees: Dragee[]): RuleResult[] =>
        kinds[presenterKind].findIn(dragees)
            .map(useCase => directDependencies(useCase, dragees))
            .filter(dep => dep.dependencies)
            .map(dep => assertDrageeDependency(dep))
            .flatMap(result => result));