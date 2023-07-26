class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :password_digest, :bio

  def scheduled_events
    user_id = object.id 
    scheduled_events = ScheduledEvent.where(player_user_id: user_id)
    event_player_user_ids = scheduled_events.pluck(:player_user_id)
    event_player_user_ids
  end

  has_many :skills
  
end
