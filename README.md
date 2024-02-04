# Description
NodeJs setup for projects with TypeScript, linter, prettier and jest configured.

## 🛠️ Stack

<details>
  <summary>Click to see details</summary>

- [**NodeJs**](https://nodejs.org/) - As an asynchronous event-driven JavaScript runtime.
- [**Typescript**](https://www.typescriptlang.org/) - JavaScript with syntax for types.
- [**Jest**](https://jestjs.io/) - Jest is a delightful JavaScript Testing Framework.
- [**Express**](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.

</details>

## 🚀 Getting Started

<details>
  <summary>Click to see details</summary>
<br>

1. Clone this repository.

```bash
git clone git@github.com:Luchooo/technical-test-backend-phase-2.git
```

2. Install the dependencies:

```bash
npm install
```

3. Run tests:

```bash
npm run test
```

4. Run the development server:

```bash
npm run dev

```

4. Open [**http://localhost:3000**](http://localhost:3000/) with your browser to see the result 🚀
</details>



## 🧞 Commands
<details>
  <summary>Click to see details</summary>
<br>

|     | Command          | Action                                        |
| :-- | :--------------- | :-------------------------------------------- |
| ⚙️  | `dev`            | Starts local dev server at `localhost:3000`.  |
| ⚙️  | `build`          | Build your production site to `./build/`.     |
| ⚙️  | `start`          | Start production server                       |
| ⚙️  | `fm`             | Format all supported files.                   |
| ⚙️  | `lint`           | Lint all JS/TS files in the src directory.    |
| ⚙️  | `typecheck`      | Check types of files.                         |
| ⚙️  | `test`           | Run test.                                     |
                   
</details>


## 🧠 Technical test phase final

<ol>
  <li>
    <details>
      <summary>Información obtenida</summary>

  - Sólo los usuarios registrados pueden subir vídeos.
  - Cualquier usuario puede comentar o dar like sobre un vídeo.
  - Si el video es público cualquier usuario podra verlo, si el  video es privado solo los usuarios registrados pueden verlo
  - Atributos de video
    - ID
    - Title
    - Description
    - Url
    - Fecha de creación
    - Visibilidad (Público|Privado).
  - Atributos comentario
    - ID
    - Description
    - Fecha de creación
  - Usuario registrado (***Stakeholder***)
    - ID
    - Name
    - Email
    - Password  
    - Avatar
  - Usuario no registrado (***Stakeholder***)
    </details>
  </li>

  <li>
    <details>
      <summary>Actores que intervienen en el proceso 🧍</summary>

  👉 En una aplicación de gestión de vídeos, veo dos actores o stakeholders involucrados, cada uno con roles y responsabilidades específicos. Los principales actores son:

  - Usuario Registrado:
    - Descripción: Un usuario que ha creado una cuenta en la aplicación.
    - Responsabilidades:
      - Puede subir vídeos.
      - Puede gestionar vídeos.
      - Puede comentar en vídeos.
      - Puede dar likes a vídeos.
      - Puede gestionar su perfil.
  - Usuario No Registrado:
    - Descripción: Un visitante de la aplicación que aún no ha creado una cuenta.
    - Responsabilidades:
      - Puede ver vídeos públicos.
      - Puede comentar en vídeos.
      - Puede dar likes a vídeos.
      - Puede registrarse para obtener una cuenta

  👉 Diagrama de uso: Obtener videos
    </details>
  </li>
<ol>
                   
