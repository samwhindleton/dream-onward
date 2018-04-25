class Users
  # add attribute readers for instance access
  attr_reader :id, :first_name, :last_name, :email, :username, :password

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
  end

  # ==========
  # INDEX
  # ==========

  def self.all
    results = DB.exec(
      <<-SQL
        SELECT * FROM users;
      SQL
    )

    # empty array, stores converted results
    users = []

    # for each result, create a new_user
    results.each do |result|
      new_user = Users.new({
        "id" => result["id"],
        "first_name" => result["first_name"],
        "last_name" => result["last_name"],
        "email" => result["email"],
        "username" => result["username"],
        "password" => result["password"]
      })
      # push new_user to users array
      users.push(new_user)
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
        SELECT * FROM users
        WHERE id = #{id};
      SQL
    )

    # null user
    user = nil

    # for each result, create a new_user
    results.each do |result|
      new_user = Users.new({
        "id" => result["id"],
        "first_name" => result["first_name"],
        "last_name" => result["last_name"],
        "email" => result["email"],
        "username" => result["username"],
        "password" => result["password"]
      })
      user = new_user
    end

    # return user
    return user
  end

  # ==========
  # CREATE
  # ==========

  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO users (first_name, last_name, email, username, password)
        VALUES ('#{opts["first_name"]}', '#{opts["last_name"]}', '#{opts["email"]}', '#{opts["username"]}', '#{opts["password"]}')
        RETURNING id, first_name, last_name, email, username, password;
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
          password = '#{opts["password"]}'
        WHERE id = #{id}
        RETURNING id, first_name, last_name, email, username, password;
      SQL
    )
    return Users.new(results.first)
  end
end
