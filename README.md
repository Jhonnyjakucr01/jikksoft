# jikksoft
prueba tecnica jikksoft

```mermaid

classDiagram
    class User {
        +int id
        +string username
        +string email
        +string password
        +string nombre
        +date created_at
        +date updated_at
    }

    class Post {
        +int id
        +int user_id
        +string titulo
        +text contenido
        +date created_at
        +date updated_at
    }

    class Comentario {
        +int id
        +int post_id
        +int user_id
        +text contenido
        +date created_at
        +date updated_at
     }

    class Etiqueta {
        +int id
        +string nombre
    }

    class PostEtiqueta {
        +int post_id
        +int etiqueta_id
    }

    %% Relaciones
    User "1" --> "many" Post : crear
    User "1" --> "many" Comentario : escribe
    Post "1" --> "many" Comentario : tiene
    Post "many" --> "many" Etiqueta : usa
    PostEtiqueta .. Post
    PostEtiqueta .. Etiqueta
