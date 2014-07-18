class WelcomeController < ApplicationController

  def index
    @school_list=school_list
  end

  def feeds
    # if fb_school_list.find_index{|school| school[:name]==@school}!=nil
    #   fetch_feeds_from_fb
    #   feeds=feeds_to_json
    # else
    #   page=FbPage.find_by_page_id(@school).first
    #   feeds=Feed.find_by_page_id(page.id).page(params[:page]).per(25)
    #   feeds=feeds_model_to_json(feeds)
    #   @next_page_params=params[:page].to_i+1
    # end
feeds=feeds_model_to_json
    render :json => {next_page:@next_page_params,feeds:feeds}.to_json
  end

  private

    def feeds_model_to_json 
    result=[]
    [1,2,3,4,5,6,7,8].each do|f|
      feed={}
      object_id=1
      feed_id=1
      title="NEW．韓．涼感素面簡約字母棉T"
      if object_id.present?
        feed[:id]=feed_id
        feed[:object_id]=object_id
        feed[:title]=title
        feed[:referer]="https://www.joyce-shop.com/photo/SELF/01016339.jpg"
        feed[:image]="https://www.joyce-shop.com/photo/SELF/01016339.jpg"#f["picture"]#.to_s.sub("_s","_n")
        feed[:preview]=feed[:image]
        result<<feed
      end
    end
    result
  end

  def school_list
    [ {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"},
      {title:"表特世新",name:"SHUbeauty"}
      ]
  end
end
