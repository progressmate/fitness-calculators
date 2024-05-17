# fitness-calculators

[![node](https://github.com/progressmate/fitness-calculators/actions/workflows/node.yml/badge.svg)](https://github.com/progressmate/fitness-calculators/actions/workflows/node.yml) [![release](https://github.com/progressmate/fitness-calculators/actions/workflows/release.yml/badge.svg)](https://github.com/progressmate/fitness-calculators/actions/workflows/release.yml)

A collection of functions that perform health & fitness calculations.

## Calculators

This section outlines the available calculations within the package.

### BMI (Body Mass Index)

```ts
import { bmi } from "@progressmate/fitness-calculators"

const height = 1.8;
const weight = 76;
const result = bmi(height, weight);
```

### BMR (Basal Metabolic Rate)

This function supports common variations on the underlying equation which can be selected using the `BMREquation` enum.

```ts
import { bmr, Gender, BMREquation } from "@progressmate/fitness-calculators"

const height = 180;
const weight = 76;
const age = 30;
const result = bmr(age, height, weight, Gender.Male, BMREquation.Mifflin);
```

### IBW (Ideal Body Weight)

This function supports common variations on the underlying equation which can be selected using the `IBWEquation` enum.

```ts
import { ibw, Gender, IBWEquation } from "@progressmate/fitness-calculators"

const height = 180
const result = ibw(height, Gender.Male, IBWEquation.Hamwi);
```
