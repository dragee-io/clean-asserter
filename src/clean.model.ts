import type { Dragee } from "@dragee-io/asserter-type";

export const controllerProfile = "clean/controller";
export const presenterProfile = "clean/presenter";
export const useCaseProfile = "clean/use_case";

const profilesName =
  [
    controllerProfile,
    presenterProfile,
    useCaseProfile
  ]; 

export type Profile = typeof profilesName[number]

type CleanProfileChecks = {
  [profile in Profile]: {
   findIn: (dragees : Dragee[]) => Dragee[],
   is:(profile : string) => boolean
  }
}

export const profiles: CleanProfileChecks = {} as CleanProfileChecks;

profilesName.map(profile => {
  profiles[profile] = {
    is: (value: string) => value === profile,
    findIn: (dragees: Dragee[]) => dragees.filter(dragee => dragee.profile === profile)
  }
  return profiles[profile];
})

export const profileOf = (dragee: Dragee, ...profilesFilter: Profile[]): boolean => 
  profilesFilter.map(kf => profiles[kf].is(dragee.profile)).some(b => b)