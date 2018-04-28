class Users
  # add attribute readers for instance access
  attr_reader :id, :first_name, :last_name, :email, :username, :password, :created, :updated, :images

  # if heroku, use heroku psql db
  if (ENV['DATABASE_URL'])
    uri = URI.parse(ENV['DATABASE_URL'])
    DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
  # else, use local psql db
  else
    DB = PG.connect(
      host: "localhost",
      port: 5432,
      dbname: 'dream_onward')
  end

  def initialize(opts)
    @id = opts["id"].to_i
    @first_name = opts["first_name"]
    @last_name = opts["last_name"]
    @email = opts["email"]
    @username = opts["username"]
    @password = opts["password"]
    @created = opts["created"]
    @updated = opts["updated"]
    #if images is in opts hash, show it
    if opts["images"]
      @images = opts["images"]
    end
  end

  # ==========
  # INDEX
  # ==========

  def self.all
    results = DB.exec(
      <<-SQL
        SELECT
          users.*,
          user_boards.id AS image_id,
          user_boards.user_id AS image_user_id,
          user_boards.image AS image,
          user_boards.description AS image_description,
          user_boards.created AS image_created,
          user_boards.updated AS image_updated
        FROM users
        LEFT JOIN user_boards
          ON users.id = user_boards.user_id
        ORDER BY users.id ASC;
      SQL
    )

    # empty users array, stores converted results
    users = []

    # keeps track of previously created user and image ids
    last_user_id = nil
    last_image_id = nil

    # for each result
    results.each do |result|
      # create a new_user
      if result["id"] != last_user_id
        new_user = Users.new({
          "id" => result["id"],
          "first_name" => result["first_name"],
          "last_name" => result["last_name"],
          "email" => result["email"],
          "username" => result["username"],
          "password" => result["password"],
          "created" => result["created"],
          "updated" => result["updated"],
          "images" => []
        })

        # push new_user to users array
        users.push(new_user)

        last_user_id = result["id"]
      end

      # create a new_user_image
      if result["image_id"] != last_image_id
        new_user_image = UserBoards.new({
          "id" => result["image_id"],
          "user_id" => result["image_user_id"],
          "image" => result["image"],
          "description" => result["image_description"],
          "created" => result["image_created"],
          "updated" => result["image_updated"]
        })

        # push new_user_image to the last users images array
        users.last.images.push(new_user_image)
        last_image_id = result["image_id"]
      end
    end

    # return users array
    return users
  end

  # ==========
  # SHOW
  # ==========

  def self.find(id)
    results = DB.exec(
      <<-SQL
        SELECT
          users.*,
          user_boards.id AS image_id,
          user_boards.user_id AS image_user_id,
          user_boards.image AS image,
          user_boards.description AS image_description,
          user_boards.created AS image_created,
          user_boards.updated AS image_updated
        FROM users
        LEFT JOIN user_boards
          ON users.id = user_boards.user_id
        WHERE users.id = #{id}
        -- sort user images by updated timestamp, by newly updated
        ORDER BY user_boards.updated DESC;
      SQL
    )

    # empty images array, stores converted results
    images = []

    # keeps track of previously created image id
    last_image_id = nil

    # for each result, create a new_user
    results.each do |result|
      if result["image_id"] != last_image_id
        new_user_image = UserBoards.new({
          "id" => result["image_id"],
          "user_id" => result["image_user_id"],
          "image" => result["image"],
          "description" => result["image_description"],
          "created" => result["image_created"],
          "updated" => result["image_updated"]
        })

        images.push(new_user_image)
        last_image_id = result["image_id"]
      end
    end

    # query result for user
    result = results.first

    user = Users.new({
      "id" => result["id"],
      "first_name" => result["first_name"],
      "last_name" => result["last_name"],
      "email" => result["email"],
      "username" => result["username"],
      "password" => result["password"],
      "created" => result["created"],
      "updated" => result["updated"],
      "images" => images
    })

    # return user
    return user
  end

  # ==========
  # CREATE
  # ==========

  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO users (first_name, last_name, email, username, password, created, updated)
        VALUES ('#{opts["first_name"]}', '#{opts["last_name"]}', '#{opts["email"]}', '#{opts["username"]}', '#{opts["password"]}', 'now()', 'now()')
        RETURNING id, first_name, last_name, email, username, password, created, updated;
      SQL
    )
    return Users.new(results.first)
  end

  # ==========
  # DELETE
  # ==========

  def self.delete(id)
    results = DB.exec(
      <<-SQL
        DELETE FROM users
        WHERE id = #{id};
      SQL
    )

    return {deleted: true}
  end

  # ==========
  # UPDATE
  # ==========

  def self.update(id, opts)
    results = DB.exec(
      <<-SQL
        UPDATE users
        SET
          first_name = '#{opts["first_name"]}',
          last_name = '#{opts["last_name"]}',
          email = '#{opts["email"]}',
          username = '#{opts["username"]}',
          password = '#{opts["password"]}',
          updated = 'now()}'
        WHERE id = #{id}
        RETURNING id, first_name, last_name, email, username, password, created, updated;
      SQL
    )

    return Users.new(results.first)
  end
end
