interface AverageParams {
    weight: number
    birthDate: string
    breed: string
}
export function calculateAverageMilk({weight, birthDate, breed} : AverageParams) {

  const birthDateObj = new Date(birthDate)
  const today = new Date()
  const ageInYears = today.getFullYear() - birthDateObj.getFullYear()

  if (ageInYears < 2) {
    return 0
  }

  let weightFactor
  if (weight < 400) {
    weightFactor = 0.6 // Small cows
  } else if (weight <= 600) {
    weightFactor = 0.8 // Average cows
  } else {
    weightFactor = 1.0 // Large cows
  }


  const breedFactors: Record<string, number> = {
    Holstein: 1.2,
    Jersey: 1.0,
    Angus: 0.5,
    Other: 0.8
  }

  const breedFactor = breedFactors[breed] || breedFactors['Other']

  const baseProduction : number = 25 * weightFactor * breedFactor

  const ageFactor = ageInYears >= 5 ? 0.9 : 1.0

  const averageDailyProduction = baseProduction * ageFactor

  return averageDailyProduction.toFixed(2)
}
