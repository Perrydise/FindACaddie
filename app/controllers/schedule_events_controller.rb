class ScheduleEventsController < ApplicationController

    def create
        # player_user = User.find_by(id: params[:id])
        # player_user_id = player_user.id
        # date = params[:event_date]
        # location = params[:location]
        player_user_id = session[:user_id]
        puts player_user_id
        new_event = ScheduleEvent.create!(player_user_id: player_user_id, event_date: params[:event_date], message: params[:message])
        render json: new_event
    end

    private

    def event_params
        params.permit(:player_user_id, :event_date, :message)
    end

end
