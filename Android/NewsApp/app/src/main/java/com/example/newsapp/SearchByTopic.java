package com.example.newsapp;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
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
import static android.view.View.VISIBLE;

public class SearchByTopic extends AppCompatActivity {
    Button search;
    EditText editText;
    Adapter adapter;
    ProgressBar progressBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_by_topic);
        editText=findViewById(R.id.editText);
        search=findViewById(R.id.search);
        progressBar = (ProgressBar) findViewById(R.id.progressBar);

        search.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(editText.getText().toString().toLowerCase().trim().equals("")){
                    editText.setError("Enter topic");
                }
                else{
                    progressBar.setVisibility(VISIBLE);
                    sendRequest();
                }
            }
        });
    }

    private void sendRequest() {
        String JSON_URL="https://newsapi.org/v2/everything?q="+editText.getText().toString().toLowerCase().trim()+"&apiKey="+Constants.APIKEY;
        Log.d("myapp","JSON_URL "+JSON_URL);
        StringRequest stringRequest=new StringRequest(Request.Method.GET, JSON_URL,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {

                            progressBar.setVisibility(INVISIBLE);

                            JSONObject jsonObject=new JSONObject(response);
                            JSONArray articles=jsonObject.getJSONArray("articles");

                            Toast.makeText(SearchByTopic.this, String.valueOf(articles.length()), Toast.LENGTH_SHORT).show();

                            RecyclerView recyclerView=findViewById(R.id.recyclerView);
                            LinearLayoutManager storiesLayoutManager=new LinearLayoutManager(getApplicationContext());
                            storiesLayoutManager.setOrientation(RecyclerView.VERTICAL);
                            recyclerView.setLayoutManager(storiesLayoutManager);

                            List<NewsModel> list=new ArrayList<>();
                            for(int i=0;i<articles.length();i++){
                                JSONObject singleArticle=articles.getJSONObject(i);
                                String author=singleArticle.getString("author");
                                String title=singleArticle.getString("title");
                                String description=singleArticle.getString("description");
                                String url=singleArticle.getString("url");
                                String urlToImage=singleArticle.getString("urlToImage");
                                String content=singleArticle.getString("content");
                                String publishedAt=singleArticle.getString("publishedAt");

                                JSONObject sourceObject=singleArticle.getJSONObject("source");
                                String source=sourceObject.getString("name");


                                list.add(new NewsModel(title,content,author,publishedAt,urlToImage,url,source));


                                Log.d("myapp",title+"  ->"+author);
                            }

                            adapter=new Adapter(list);
                            recyclerView.setAdapter(adapter);
                        } catch (JSONException error) {
                            Log.d("myapp",error.getMessage());
                            Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("myapp",error.toString());
                        Toast.makeText(getApplicationContext(), error.toString(), Toast.LENGTH_SHORT).show();
                    }
                });
        RequestQueue requestQueue = Volley.newRequestQueue(this);
        requestQueue.add(stringRequest);
    }
}
