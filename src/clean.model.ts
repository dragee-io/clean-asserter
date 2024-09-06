import type { Dragee } from "@dragee-io/asserter-type";

export const controllerKind = "clean/controller";
export const presenterKind = "clean/presenter";
export const useCaseKind = "clean/use_case";

const kindsName =
  [
    controllerKind,
    presenterKind,
    useCaseKind
  ]; 

export type Kind = typeof kindsName[number]

type CleanKindChecks = {
  [kind in Kind]: {
   findIn: (dragees : Dragee[]) => Dragee[],
   is:(kind : string) => boolean
  }
}

export const kinds: CleanKindChecks = {} as CleanKindChecks;

kindsName.map(kind => {
  kinds[kind] = {
    is: (value: string) => value === kind,
    findIn: (dragees: Dragee[]) => dragees.filter(dragee => dragee.kind_of === kind)
  }
  return kinds[kind];
})

export const kindOf = (dragee: Dragee, ...kindsFilter: Kind[]): boolean => 
  kindsFilter.map(kf => kinds[kf].is(dragee.kind_of)).some(b => b)