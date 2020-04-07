package com.example.newsapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.CheckBox;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import static android.view.View.INVISIBLE;

public class NewsBySpecificSource extends AppCompatActivity {
    Adapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_news_by_specific_source);

        getSourceList();

    }

    void getSourceList(){
        String JSON_URL="https://newsapi.org/v2/sources?apiKey="+Constants.APIKEY;
        StringRequest stringRequest=new StringRequest(Request.Method.GET, JSON_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {
                            final ProgressBar progressBar = (ProgressBar) findViewById(R.id.progressBar);
                            progressBar.setVisibility(View.GONE);

                            JSONObject jsonObject=new JSONObject(response);
                            JSONArray articles=jsonObject.getJSONArray("sources");

                            Log.d("myapp",String.valueOf(articles.length()));
                            Toast.makeText(NewsBySpecificSource.this, String.valueOf(articles.length()), Toast.LENGTH_SHORT).show();

                            RecyclerView recyclerView=findViewById(R.id.recyclerView);
                            LinearLayoutManager storiesLayoutManager=new LinearLayoutManager(getApplicationContext());
                            storiesLayoutManager.setOrientation(RecyclerView.VERTICAL);
                            recyclerView.setLayoutManager(storiesLayoutManager);

                            List<NewsModel> list=new ArrayList<>();
                            for(int i=0;i<articles.length();i++){
                                JSONObject singleArticle=articles.getJSONObject(i);

                                String author=singleArticle.getString("id");
                                String title="Description : ";
//                                String description=singleArticle.getString("description");
                                String url=singleArticle.getString("url");
                                String urlToImage="data:image/png;base64,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";//blank
                                String content=singleArticle.getString("description");
                                String publishedAt=singleArticle.getString("language");

//                                JSONObject sourceObject=singleArticle.getJSONObject("source");
                                String source=singleArticle.getString("name");


                                list.add(new NewsModel(title,content,author,publishedAt,urlToImage,url,source));


                                Log.d("myapp",title+"  ->"+author);
                            }

                            adapter=new Adapter(list);
                            recyclerView.setAdapter(adapter);
                        } catch (JSONException error) {
                            Log.d("myapp","JSONException "+error.toString());
                            Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("myapp","onErrorResponse "+error.getMessage());
                        Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                    }
                });

        RequestQueue requestQueue = Volley.newRequestQueue(this);
        requestQueue.add(stringRequest);
    }
}
