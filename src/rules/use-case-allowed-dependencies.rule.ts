import { type Dragee, type RuleResult, expectDragee, directDependencies, type DrageeDependency, RuleSeverity } from "@dragee-io/asserter-type";
import { CleanRule } from '../clean-rule.model.ts';
import { kinds, kindOf, useCaseKind, controllerKind, presenterKind } from "../clean.model.ts";

const assertDrageeDependency = ({root, dependencies}: DrageeDependency): RuleResult[] => 
    dependencies.map(dependency => 
        expectDragee(dependency, `The use case "${root.name}" must not have any dependency of type "${dependency.kind_of}"`, 
            (dragee) => !kindOf(dragee, controllerKind, presenterKind)
        )
    );

export default new CleanRule(
    'Use Case Allowed Dependencies',
    RuleSeverity.ERROR,
    (dragees: Dragee[]): RuleResult[] =>
        kinds[useCaseKind].findIn(dragees)
            .map(useCase => directDependencies(useCase, dragees))
            .filter(dep => dep.dependencies)
            .map(dep => assertDrageeDependency(dep))
            .flatMap(result => result));
