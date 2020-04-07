package com.example.newsapp;

import android.content.Intent;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;

import java.util.List;

public class Adapter extends RecyclerView.Adapter<Adapter.ViewHolder> {

    private List<NewsModel> list;

    public Adapter(List<NewsModel> list) {
        this.list = list;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view= LayoutInflater.from(parent.getContext()).inflate(R.layout.item,parent,false);

        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull final ViewHolder holder, final int position) {
        if(list.get(position).getImage_url().equals("")){
            holder.imageView.setVisibility(View.GONE);
        }
        else {
            Glide
                    .with(holder.itemView.getContext())
                    .load(list.get(position).getImage_url())

                    .into(holder.imageView);
        }
        holder.title.setText(list.get(position).getTitle());
        holder.content.setText(list.get(position).getContent());
        holder.author.setText(list.get(position).getAuthor());
        holder.source.setText(list.get(position).getSource());
        holder.date.setText(list.get(position).getDate());
//        holder.link.setText(list.get(position).getLink());

        holder.link.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String url=list.get(position).getLink();

                Intent intent = new Intent(Intent.ACTION_VIEW);
                intent.setData(Uri.parse(url));
                holder.itemView.getContext().startActivity(intent);


            }
        });

    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    class ViewHolder extends  RecyclerView.ViewHolder{


        private TextView title,content,author,date,link,source;
        ImageView imageView;
        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            title=itemView.findViewById(R.id.title);
            content=itemView.findViewById(R.id.content);
            author=itemView.findViewById(R.id.author);
            date=itemView.findViewById(R.id.datetime);
            link=itemView.findViewById(R.id.link);
            source=itemView.findViewById(R.id.source);

            imageView=itemView.findViewById(R.id.imageView);


        }
    }
}