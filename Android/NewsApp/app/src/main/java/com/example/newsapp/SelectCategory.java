package com.example.newsapp;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;

public class SelectCategory extends AppCompatActivity {
    Spinner spinner1,spinner2;
    Button button;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_select_category);
        spinner1=findViewById(R.id.spinner1);
        spinner2=findViewById(R.id.spinner2);
        button=findViewById(R.id.button);

        setSpinner1();

        setSpinner2();

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String s1=spinner1.getSelectedItem().toString();
                String s2=spinner2.getSelectedItem().toString();
                Log.d("myapp",s1+"  "+s2);
                Intent intent=new Intent(SelectCategory.this,MainActivity.class);
                intent.putExtra("comingfrom","SelectCategory");
                intent.putExtra("category",s1);
                intent.putExtra("country",s2);
                startActivity(intent);
            }
        });



    }

    private void setSpinner2() {
        String[] arraySpinner2 = new String[] {
                "ae", "ar", "at", "au" ,"be" ,"bg" ,"br" ,"ca" ,"ch" ,"cn" ,"co" ,"cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu",
                "id", "ie", "il", "in", "it" ,"jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz",
                "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"
        };

        ArrayAdapter<String> adapter2 = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, arraySpinner2);
        adapter2.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner2.setAdapter(adapter2);
    }

    private void setSpinner1() {
        String[] arraySpinner1 = new String[] {
                "business", "entertainment", "general", "health", "science", "sports", "technology"
        };

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, arraySpinner1);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner1.setAdapter(adapter);
    }
}
