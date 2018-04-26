class UserBoards
  # add attribute readers for instance access
  attr_reader :id, :user_id, :image, :description, :created, :updated

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
    @user_id = opts["user_id"].to_i
    @image = opts["image"]
    @description = opts["description"]
    @created = opts["created"]
    @updated = opts["updated"]
  end

  # ==========
  # INDEX
  # ==========

  def self.all
    results = DB.exec(
      <<-SQL
        SELECT * FROM user_boards
        ORDER BY updated DESC;
      SQL
    )

    # empty array, stores converted results
    user_boards = []

    # for each result, create a new_user_board
    results.each do |result|
      new_user_board = UserBoards.new({
        "id" => result["id"],
        "user_id" => result["user_id"],
        "image" => result["image"],
        "description" => result["description"],
        "created" => result["created"],
        "updated" => result["updated"]
      })
      # push new_user_board to user_boards array
      user_boards.push(new_user_board)
    end

    # return user_boards array
    return user_boards
  end

  # ==========
  # SHOW
  # ==========

  def self.find(id)
    results = DB.exec(
      <<-SQL
        SELECT * FROM user_boards
        WHERE id = #{id};
      SQL
    )

    # null user_board
    user_board = nil

    # for each result, create a new_user_board
    results.each do |result|
      new_user_board = UserBoards.new({
        "id" => result["id"],
        "user_id" => result["user_id"],
        "image" => result["image"],
        "description" => result["description"],
        "created" => result["created"],
        "updated" => result["updated"]
      })
      user_board = new_user_board
    end

    # return user_board
    return user_board
  end

  # ==========
  # CREATE
  # ==========

  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO user_boards (user_id, image, description, created, updated)
        VALUES ('#{opts["user_id"]}', '#{opts["image"]}', '#{opts["description"]}', 'now()', 'now()')
        RETURNING id, user_id, image, description, created, updated;
      SQL
    )
    return UserBoards.new(results.first)
  end

  # ==========
  # DELETE
  # ==========

  def self.delete(id)
    results = DB.exec(
      <<-SQL
        DELETE FROM user_boards
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
        UPDATE user_boards
        SET
          user_id = '#{opts["user_id"]}',
          image = '#{opts["image"]}',
          description = '#{opts["description"]}',
          updated = 'now()}'
        WHERE id = #{id}
        RETURNING id, user_id, image, description, created, updated;
      SQL
    )
    return UserBoards.new(results.first)
  end
end
