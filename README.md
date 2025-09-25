# jikksoft
prueba tecnica jikksoft

```mermaid

classDiagram
    class User {
        +int id
        +string username
        +string email
        +string password_hash
        +string nombre
        +datetime fecha_creacion
    }

    class Post {
        +int id
        +int user_id
        +string titulo
        +text contenido
        +datetime fecha_creacion
        +datetime fecha_actualizacion
    }

    class Comment {
        +int id
        +int post_id
        +int user_id
        +text contenido
        +datetime fecha_creacion
    }

    class Tag {
        +int id
        +string nombre
    }

    class PostTag {
        +int post_id
        +int tag_id
    }

    %% Relaciones
    User "1" --> "many" Post : crea
    User "1" --> "many" Comment : escribe
    Post "1" --> "many" Comment : tiene
    Post "many" --> "many" Tag : usa
    PostTag .. Post
    PostTag .. Tag
