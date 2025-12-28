class ApplicationController < ActionController::API
  before_action :authorize_request

  private

  def authorize_request
    api_key = request.headers['Authorization']&.split(' ')&.last
    return render_unauthorized unless api_key == ENV.fetch('API_KEY')
  end

  def render_unauthorized
    render json: { error: 'Not authorized' }, status: :unauthorized
  end
end
