# blowfish

[npm-url]: https://npmjs.org/package/@sighmir/blowfish
[npm-image]: https://img.shields.io/npm/v/@sighmir/blowfish.svg
[pipeline-image]: https://github.com/Sighmir/blowfish/workflows/CI/CD/badge.svg
[pipeline-url]: https://github.com/Sighmir/blowfish/actions?query=workflow%3ACI%2FCD
[coverage-image]: https://codecov.io/gh/Sighmir/blowfish/graph/badge.svg
[coverage-url]: https://codecov.io/gh/Sighmir/blowfish
[quality-image]: https://sonarcloud.io/api/project_badges/measure?project=blowfish&metric=alert_status
[quality-url]: https://sonarcloud.io/dashboard?id=blowfish
[depstat-url]: https://david-dm.org/Sighmir/blowfish
[depstat-image]: https://david-dm.org/Sighmir/blowfish/status.svg
[devdepstat-url]: https://david-dm.org/Sighmir/blowfish?type=dev
[devdepstat-image]: https://david-dm.org/Sighmir/blowfish/dev-status.svg

[![NPM version][npm-image]][npm-url]
[![Pipeline Status][pipeline-image]][pipeline-url]
[![Coverage Status][coverage-image]][coverage-url]
[![Sonarcloud Status][quality-image]][quality-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Dev Dependency Status][devdepstat-image]][devdepstat-url]

Blowfish encryption in TypeScript with custom schedule

Inspired by [egoroof-blowfish](https://github.com/egoroof/blowfish) and [melia](https://github.com/NoCode-NoLife/melia)

## Example

```ts
import blowfish from "@sighmir/blowfish";

const bf = blowfish("my_key");
const buffer = Buffer.from("blowfish");

bf.encipher(buffer);
console.log(buffer); // c8a2de2a895325f5

bf.decipher(buffer);
console.log(buffer); // 626c6f7766697368
```

## API

### blowfish(key, schedule)

Create blowfish encryption object using specified key, if no key is provided it will use "blowfish" as the default key, if no schedule is provided it will use the default one used on the blowfish encryption algorithm, the schedule must be a Buffer of 1042 bytes, the first 18 bytes will fill P, the next 1024 will fill S with 4 Uint32Array of 256 bytes.

### bf.decipher(buffer)

Will decipher the buffer in place, altering the buffer passed as argument.

### bf.encipher(buffer)

Will encipher the buffer in place, altering the buffer passed as argument.

## License

```
blowfish - Blowfish encryption in TypeScript with custom schedule
Copyright (C) 2020  Guilherme Caulada

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```
