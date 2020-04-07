package com.example.newsapp;

import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
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
import java.util.Arrays;
import java.util.List;

import static android.view.View.INVISIBLE;

public class CheckBoxPage extends AppCompatActivity {

    LinearLayout ll;
    ArrayList<String> names;
    ArrayList<String> ids;
    CheckBox[] ch;
    Boolean ticked[];
    Button done;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_check_box_page);
        ll = (LinearLayout) findViewById(R.id.ll);
        done=findViewById(R.id.done);
        done.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.O)
            @Override
            public void onClick(View v) {
                    List<String> finallist=new ArrayList<>();
                    for(int k=0;k<ticked.length;k++){
                        if(ticked[k]){
                            finallist.add(ids.get(k));
                        }

                    }
                    String finalString=String.join(",", finallist);
                    Log.d("myapp","final String is : "+finalString);
                    Intent intent=new Intent(CheckBoxPage.this,MainActivity.class);
                    intent.putExtra("comingfrom","CheckBoxPage");
                    intent.putExtra("finalString",finalString);
                    startActivity(intent);

            }
        });


        ids=new ArrayList<>();
        names=new ArrayList<>();

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
                            progressBar.setVisibility(INVISIBLE);

                            JSONObject jsonObject=new JSONObject(response);
                            JSONArray articles=jsonObject.getJSONArray("sources");

                            Log.d("myapp",String.valueOf(articles.length()));
                            Toast.makeText(CheckBoxPage.this, String.valueOf(articles.length()), Toast.LENGTH_SHORT).show();



                            ids.clear();
                            names.clear();

                            for(int i=0;i<articles.length();i++){
                                JSONObject singleArticle=articles.getJSONObject(i);

                                String author=singleArticle.getString("id");//IMP
                                String source=singleArticle.getString("name");//IMP

                                ids.add(author);
                                names.add(source);



                            }
                            aftervolley();


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

        ///


    }

    void aftervolley(){
        Log.d("myapp","names size: "+String.valueOf(names.size()));

        ch = new CheckBox[names.size()];
        ticked=new Boolean[names.size()];
        Arrays.fill(ticked,false);

        for(int i=0; i<names.size(); i++) {
            ch[i] = new CheckBox(this);
            ch[i].setId(i);
            ch[i].setText(names.get(i));
            ll.addView(ch[i]);
        }

        for (int i = 0; i < names.size(); i++) {
            final int j = i;
            ch[j].setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
                @Override
                public void onCheckedChanged(CompoundButton buttonView,
                                             boolean isChecked) {

                    Log.d("myapp","Checked ID :: " + ch[j].getId() +isChecked);
                    ticked[j]=isChecked;

                }
            });
        }
    }
}
